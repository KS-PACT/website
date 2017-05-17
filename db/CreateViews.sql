CREATE VIEW Hardware_Item_View AS
	SELECT h.id, h.name, h.description, r.checked_out < now() AND r.return > now() AND r.status = 'Confirmed' AS is_checked_out
	FROM HardwareResource h
	JOIN ResourceRequest r
		ON h.id = r.item_id;
		
CREATE VIEW Hardware_Processing_View AS
	SELECT *
	FROM HardwareResource h
	JOIN ResourceRequest r
		ON h.id = r.item_id
	WHERE r.status == 'Processing';
