CREATE VIEW Hardware_Item_View AS
	SELECT h.id, h.name, h.description, r.checked_out < now() AND r.return > now() AS is_checked_out
	FROM HardwareResource h
	JOIN ResourceRequest r
		ON h.id = r.item_id;